# Healthy — Final Project

Healthy is an English-language, responsive student demonstration website about fitness activities and example locations in Kazakhstan. It consists of eight connected pages.

## How to run
Open index.html in a modern browser, or serve the project root with python -m http.server 8000 and visit http://localhost:8000.

## Pages and features
- index.html: introduction and personalised greeting.
- sports.html: live activity search and category filter.
- services.html: example prices, plans and a persistent favourites list.
- locations.html: combined city and activity filters and an FAQ.
- contact.html: client-side form validation and an on-page confirmation.
- register.html: sign-up with required-field, email, phone and password validation.
- login.html: checks the credentials saved by sign-up.
- profile.html: shows the signed-in user's details and offers logout.

The light/dark choice is shared across pages through localStorage. The header and mobile menu are consistent across the site. CSS, JavaScript, images, jQuery and Bootstrap are included locally.

## Important demonstration limits
This frontend uses localStorage for registration, including the password, as required by the assignment. It is not secure and must never be used for real accounts or real passwords. Accounts exist only in the same browser and are not shared across devices. No booking, purchase, message delivery or payment takes place. Locations and prices are examples. A production application would need a backend, secure password hashing, database and server-side validation.

## Publishing
For GitHub Pages, upload the contents of this folder to the root of a repository and enable Pages for the main branch. Submit the repository URL and live Pages URL separately. Team names, group, work division and both links must be added to the accompanying report and links file by the team.
