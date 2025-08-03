---
slug: point-updates
title: Point Rework & New Website
authors:
  - iraas
tags:
  - discord
---
After around 6 months of near daily development and hundreds of hours of total development time if not over a thousand. We are finally ready to release the new point update. This is the largest scale update we have ever done. <!-- truncate -->On the surface it introduces a new website with a lot of features which will help us speed up development and our new point system! On the hidden end we recreated our communication layer between the website and bot, built a custom command registration framework and worked on moved a lot of code to use postgresql over mongodb 

# Changes 
## Point update 
We've revamped the point system fully in this update with customization and future features in mind. You are now able to call commands almost whatever you want and edit their messages fully. We also improved upon all of the other parts like making milestones be able to execute multiple things at once and also execute reverse actions if your members ever fall below the requirements. 

:::info 
With the new commands there is no more command clutter from each point system. Have one command of each type for all systems or even 3 if you want. 
::: 
## Website 
- Almost full mobile support 
- New framework which allows us to build future updates faster 
# Release notes 
## Point update 
- Merged points and rewards module 
- Dropped badges 
- Internal point systems such as invites became sources 
- Added command name to command reverser which lets code try to find correct command even if its not registered.
- Added multi action support - milestone reverse action
- Dropped milestone reset 
- Items now support actions trough consuming item 
- Created custom ipc system 
- moved from jinja2 to liquid which is cheap to sandbox ## Website 
- Moved website to sveltekit/svelte/fastapi stack 
- Dropped some pages like roblox web and most user settings
- Not all pages are yet moved like verification, security (user settings), API and triggers 
## Migration notes
- Badges were removed fully
- A lot of internal systems were dropped
- Give and remove point actions were not possible to auto migrate
- Emoji for systems wasn't possible to auto migrate. Old system didn't provide enough information
