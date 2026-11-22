# VitaWave

VitaWave is a fictional online store that sells vitamins and supplements in Ireland. We are building it for the Web Design and Client-Side Scripting group project (CA2) at National College of Ireland.

The site structure is inspired by [Holland & Barrett Ireland](https://www.hollandandbarrett.ie/). The brand, text, products and code are our own.

| | |
|---|---|
| **Group** | Group E |
| **Team** | Carlo Lombardi, Naside Ata |
| **Lecturer** | Sobia Bano |
| **Due** | Sunday 6 December 2026 |
| **Weight** | 60% of the module |
| **Live site** | Coming soon (GitHub Pages) |

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Hero banner, shop by need categories and featured products |
| Black Friday | `black-friday.html` | 12 discounted products you can filter by category and sort by price or discount |
| Basket | `basket.html` | Basket with quantities and totals, plus a demo checkout form |
| Help | `help.html` | Delivery and returns info, FAQ accordion and contact form |

## JavaScript features

- Shopping basket saved in `localStorage`, with the item counter in the navbar on every page
- Filter and sort on the Black Friday page
- Demo checkout form with custom validation (no real payment, no data is sent)
- Contact form with custom validation
- FAQ accordion on the Help page

## Built with

- HTML5 and CSS3
- [Bootstrap 5](https://getbootstrap.com/), customised with our own colours and fonts
- Vanilla JavaScript
- Google Fonts: Poppins and Open Sans

## Design

- **UI reference:** [Figma file](https://www.figma.com/design/BzXVRsw5fDnKscjK0euofW/Web-Design-Group-Project-CA2?node-id=0-1&t=H2Nafcu36RMo3gta-1), with a desktop and a mobile frame for each page. The first version of the screens was generated with Google Stitch and then edited by hand.
- **Colours:**

  | Name | Hex | Used for |
  |---|---|---|
  | Navy | `#1B2A4A` | Navbar, footer, headings |
  | Blue | `#2E6FD8` | Buttons and links |
  | Light blue | `#BFE3F7` | Section backgrounds and tags |
  | Purple | `#7B5EA7` | Offers and discount badges |
  | Background | `#F7FAFD` | Page background |

## Project structure

```text
index.html
black-friday.html
basket.html
help.html
css/style.css          one stylesheet, split into sections by issue
js/main.js             shared by every page
js/basket.js           basket in localStorage and the basket page
js/offers.js           Black Friday filter and sort
js/validation.js       checkout and contact form validation
js/faq.js              FAQ accordion
images/
```

Each page has comments like `<!-- #6 Home page -->` that show where each issue's code goes.

## How we work

- Tasks are GitHub issues on the [project board](https://github.com/users/carlo-lombardi/projects/21). Each issue links to its screen in Figma.
- One branch per issue, for example `feature/navbar`.
- Commit, push and merge into `Master`, then tell the other person.
- CSS and JavaScript sections are commented with the name of the person who wrote them.

## Run it locally

Clone the repo and open `index.html` in a browser. No build step or server is needed.

```bash
git clone https://github.com/carlo-lombardi/Web-Design-Group-Project-CA2.git
```

## Credits

- Product images: free images from Unsplash and Pexels. The sources will be listed in the report.
- Structure inspired by hollandandbarrett.ie.
- Student project for National College of Ireland. VitaWave is not a real store.
