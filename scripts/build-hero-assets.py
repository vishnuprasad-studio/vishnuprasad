#!/usr/bin/env python3
"""Create a centred, soft-white, seamless portfolio loop from the original intro."""

from __future__ import annotations

import argparse
import subprocess
import tempfile
import wave
from pathlib import Path

import numpy as np
from PIL import Image


def run(args: list[str]) -> None:
    subprocess.run(args, check=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path, help="Path to the original introduction video")
    parser.add_argument("--output-dir", type=Path, default=Path("/tmp/vishnu-hero-assets"))
    options = parser.parse_args()
    output = options.output_dir
    output.mkdir(parents=True, exist_ok=True)
    width, height, fps = 800, 1000, 24
    crossfade = 0.5
    loop_seconds = 9.0
    video_filter = (
        f"crop={width}:{height}:560:40,scale=768:960:flags=lanczos,"
        "colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,setsar=1,format=yuv420p"
    )

    with tempfile.TemporaryDirectory(prefix="vishnu-hero-") as temporary:
        temporary_path = Path(temporary)
        video_only = temporary_path / "loop-video.mp4"
        audio_input = temporary_path / "input.wav"
        audio_loop = temporary_path / "loop.wav"
        video_filter_graph = (
            f"[0:v]{video_filter},trim=start=0.5:end=9,setpts=PTS-STARTPTS[body];"
            f"[0:v]{video_filter},trim=start=9:end=9.5,setpts=PTS-STARTPTS[tail];"
            f"[0:v]{video_filter},trim=start=0:end=0.5,setpts=PTS-STARTPTS[head];"
            f"[tail][head]xfade=transition=fade:duration=0.5:offset=0[seam];"
            "[body][seam]concat=n=2:v=1:a=0,setsar=1,format=yuv420p[outv]"
        )
        run([
            "ffmpeg", "-y", "-i", str(options.input), "-filter_complex", video_filter_graph,
            "-map", "[outv]", "-an", "-t", str(loop_seconds), "-c:v", "libx264",
            "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p", str(video_only),
        ])

        run([
            "ffmpeg", "-y", "-i", str(options.input), "-t", "10", "-vn", "-ac", "2",
            "-ar", "48000", "-c:a", "pcm_f32le", str(audio_input),
        ])
        with wave.open(str(audio_input), "rb") as source:
            rate, channels = source.getframerate(), source.getnchannels()
            samples = np.frombuffer(source.readframes(source.getnframes()), dtype="<f4")
        samples = samples.reshape(-1, channels)
        crossfade_samples = int(rate * crossfade)
        first = int(rate * crossfade)
        seam_start = int(rate * 9.0)
        blend = np.linspace(0, np.pi / 2, crossfade_samples, endpoint=True, dtype=np.float32)[:, None]
        tail = samples[seam_start:seam_start + crossfade_samples]
        head = samples[:crossfade_samples]
        mixed = tail * np.cos(blend) + head * np.sin(blend)
        seamless = np.concatenate((samples[first:seam_start], mixed), axis=0)
        with wave.open(str(audio_loop), "wb") as destination:
            destination.setnchannels(channels)
            destination.setsampwidth(4)
            destination.setframerate(rate)
            destination.writeframes(seamless.astype("<f4").tobytes())

        mp4 = output / "hero.mp4"
        webm = output / "hero.webm"
        run([
            "ffmpeg", "-y", "-i", str(video_only), "-i", str(audio_loop), "-map", "0:v:0", "-map", "1:a:0",
            "-c:v", "copy", "-c:a", "aac", "-b:a", "96k", "-shortest", "-movflags", "+faststart", str(mp4),
        ])
        run([
            "ffmpeg", "-y", "-i", str(video_only), "-i", str(audio_loop), "-map", "0:v:0", "-map", "1:a:0",
            "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-c:a", "libopus", "-b:a", "80k",
            "-shortest", str(webm),
        ])

        still = temporary_path / "still.jpg"
        run([
            "ffmpeg", "-y", "-ss", "2", "-i", str(options.input), "-frames:v", "1",
            "-vf", "crop=600:750:660:40,scale=480:600:flags=lanczos", str(still),
        ])
        Image.open(still).convert("RGB").save(output / "portrait-bust.webp", "WEBP", quality=88, method=6)
        Image.open(still).convert("RGB").resize((1200, 630), Image.Resampling.LANCZOS).save(output / "og.jpg", quality=88, optimize=True)
    print(f"Created {mp4}, {webm}, portrait-bust.webp, and og.jpg ({loop_seconds:.1f}s seamless loop)")


if __name__ == "__main__":
    main()