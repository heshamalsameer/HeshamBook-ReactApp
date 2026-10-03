# Circle — Social Feed (React + Vite + MUI)

A friendly, Facebook-style social feed UI built with **React 18**, **Vite** and **Material UI**.

## Pages
| Route | What you can do |
|---|---|
| `/` Home | Stories, composer, feed, trending, online friends |
| `/profile` | Cover, bio, stats, your posts / photos / saved posts, edit profile |
| `/friends` | All friends, accept / decline requests, add suggestions, search |
| `/groups` | Join / leave groups, filter by category, create a group |
| `/pages` | Follow / unfollow pages |
| `/marketplace` | Filter & sort products, wishlist, cart drawer with quantities and checkout |
| `/messages` | Chat threads with typing indicator and automatic demo replies |
| `/notifications` | Read / unread, mark all as read, delete |
| `/settings` | Account details, dark mode, notification & privacy switches, reset demo data |

Your profile, saved posts, friends, groups, followed pages, cart and preferences are remembered in `localStorage`.

## Features
- Stories strip, "What's on your mind?" composer and a working **Create Post** modal (text, emoji, sample images or upload)
- Posts with like, comment (add your own), share (copy link), bookmark and double-click to like
- Live search across posts and people
- Light / dark mode (remembered between visits)
- Online friends, trending tags, latest photos and conversations
- Responsive: sidebars on desktop, bottom navigation on mobile

## Getting started
```bash
npm install
npm run dev      # start dev server on http://localhost:3000
npm run build    # production build in /dist
npm run preview  # preview the production build
```
