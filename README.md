# Birthday Surprise ♡
**Run:** `npm install` then `npm run dev` (open the URL on your phone via your network IP, or deploy).
**Build:** `npm run build` → upload the `dist/` folder to Netlify / Vercel / Cloudflare Pages / GitHub Pages, then send the link.

## Edit
- **Everything personal** (name, sender, letter, song text, captions, final message): `src/data/birthdayData.js`
- **Photos:** put files in `public/images/` (photo1.jpg … photo8.jpg, hidden.jpg) or edit the list in birthdayData.js. Resize to ~1000px wide so it loads fast.
- **Song:** put your own mp3 at `public/music/song.mp3`, or set `songFile` to a URL. Music never autoplays.
