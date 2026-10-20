# Vishnu Prasad — UI/UX Design Portfolio

A calm, monochrome portfolio built from the verified content in Vishnu Prasad’s résumé and introduction video. The live site uses the existing TanStack Start, React, TypeScript, and Tailwind CSS 4 project setup.

## Run locally

```sh
npm install
npm run dev
```

Run a production build with `npm run build`. Run project tests with `npm test`.

## Sections

| Section | Contents |
| --- | --- |
| Hero | Introduction video, role, résumé, and contact links |
| About | Résumé summary, profile links, and professional details |
| Skills | Skills and tools listed in the résumé, filterable by family |
| Selected work | Five résumé projects with interface sketches, clearly labelled illustrative |
| Certifications | Four résumé certifications; issuer details were not provided |
| Experience | Work history and education from the résumé |
| Selected outcomes | Only quantified results stated in the résumé |
| Contact | Email, phone, and four embedded profile links |

## Hero video

The final video files live in Lovable Assets. The source-generation script is `scripts/build-hero-assets.py`; it crops the centred, full-length subject, softens the white backdrop, creates a cross-faded video and sample-mixed audio loop, and exports portrait and social-preview stills.

```sh
python3 -m pip install numpy pillow
python3 scripts/build-hero-assets.py /path/to/introduction.mp4 --output-dir /tmp/vishnu-hero-assets
```

Requires `ffmpeg` with H.264, VP9, AAC, and Opus encoders. The 1920×1080 crop is tailored to the supplied introduction; review it if you replace that source. To refresh live media, upload the generated video files with `lovable-assets create --file …` and update the matching pointer files in `src/assets/`.

## Content notes

Résumé-backed content lives in `src/lib/data.ts`. The embedded résumé hyperlinks were used for GitHub, LinkedIn, Behance, and Linktree. Unsupported grades, testimonials, project repositories, certification issuers, and separate honours were omitted. Interface sketches are labelled as illustrative; no client project screenshots or third-party brand logos are represented as real assets.