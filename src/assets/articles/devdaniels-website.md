---
published: true
slug: devdaniels-website
author: Daniël Geerts
title: DevDaniels Website
startDate: "2025"
shortDescription: "Een portfolio website gebouwd met Angular, gehost op Azure Static Web Apps en volledig geautomatiseerd met GitHub Actions."
categories:
  - Project
  - Web Development
featuredImage:
  altText: DevDaniels Website Architecture
  srcPath: assets/images/project/devdaniels-website/devdaniels-website-architecture.jpg
githubRepo:
  label: Github - DevDaniels Website
  link: https://github.com/devdanielsun/devdaniels-website
tags:
  - Angular
  - Typescript
  - Cloudflare
  - Azure
  - SCSS
  - CI/CD (Github Actions)
  - Markdown to HTML
---

## Waarom een eigen portfolio?

Als software engineer had ik al langer het idee om een eigen plek op het internet te hebben. Niet zomaar een standaard template, maar iets dat ik zelf gebouwd heb en waar ik trots op kan zijn. Een website waar ik projecten kan laten zien, artikelen kan schrijven en waar de techniek achter de schermen net zo interessant is als wat je als bezoeker ziet. Dus ben ik ermee aan de slag gegaan.

## De keuze voor Angular en TypeScript

Voor het framework viel de keuze op **Angular**. Niet per se omdat het het hippe framework van het moment is, maar omdat ik er bijna dagelijks mee werk en het goed ken. Angular biedt een stevige structuur voor grotere projecten, en met de nieuwere versies (op moment van schrijven draait deze site op Angular 20) is het framework een stuk frisser geworden. Standalone components, signals en de `inject()` functie in plaats van constructor injection maken de code een stuk schoner.

**TypeScript** was daarbij een vanzelfsprekende keuze. Sterke typering helpt enorm bij het voorkomen van bugs, zeker als een project groeit. Het geeft vertrouwen dat wat je schrijft ook daadwerkelijk klopt, en je IDE doet een groot deel van het denkwerk voor je.

De hele applicatie is opgebouwd uit standalone components. Dat betekent dat elk component zelfstandig is en expliciet aangeeft welke dependencies het nodig heeft. Geen losse `NgModules` meer die overal doorheen geweven zitten. Dat maakt het makkelijker om te begrijpen wat elk onderdeel doet.

## Het artikelsysteem

Een van de leukste onderdelen om te bouwen was het artikelsysteem. De artikelen (waaronder dit artikel) zijn gewoon **Markdown-bestanden** met YAML-frontmatter bovenaan. Daarin staan metadata zoals de titel, auteur, datum, tags en een afbeelding.

Het laden van een artikel werkt als volgt:

1. De slug uit de URL wordt opgepikt door de Angular router.
2. Een **resolver** haalt het bijbehorende `.md`-bestand op via een HTTP-call.
3. De frontmatter wordt geparsed met `js-yaml` en de Markdown-content wordt omgezet naar HTML met `marked`.
4. De HTML wordt gesanitized met `DOMPurify` om XSS-aanvallen te voorkomen, en vervolgens gerenderd in de pagina.

Om een nieuw artikel toe te voegen hoef ik alleen een Markdown-bestand aan te maken en de slug te registreren in een simpele array. Geen database, geen CMS, gewoon bestanden in de repository. Dat houdt het lekker simpel.

## CI/CD met GitHub Actions

Met alleen code schrijven ben je er niet. Ik wilde dat alles rondom testen, linting en deployment volledig geautomatiseerd zou zijn. Daar komen **GitHub Actions** om de hoek kijken.

Er zijn twee workflows ingericht:

### 1. Run Tests (bij pull requests)

Bij elke pull request naar de `development`-branch worden automatisch de volgende stappen uitgevoerd:

- Dependencies installeren
- ESLint draaien om codekwaliteit te checken
- Unit tests uitvoeren met Karma en Jasmine in een headless Chrome-omgeving

Dit zorgt ervoor dat er geen kapotte code de development-branch in kan komen zonder dat het omvalt.

### 2. Build and Deploy (bij push naar main)

Zodra code op de `main`-branch terechtkomt, wordt de volledige pipeline doorlopen:

- Linting en tests draaien opnieuw als extra vangnet
- De Angular-applicatie wordt geproduceerd gebouwd
- Het resultaat wordt automatisch gedeployd naar **Azure Static Web Apps**

Alles draait op `ubuntu-latest` runners en het hele proces kost geen cent.

### Lokale kwaliteitscontrole

Naast de CI/CD-pipeline is er ook lokaal een vangnet ingericht met **Husky** en **lint-staged**. Bij elke commit worden automatisch Prettier (voor formatting) en ESLint (voor codekwaliteit) gedraaid over de gewijzigde bestanden. Zo kom je er al voor de push achter als er iets niet klopt.

## Hosting: Azure Static Web Apps

Een van mijn eisen was dat de hosting **gratis** moest zijn. Het is tenslotte een persoonlijk project en ik wilde er niet maandelijks voor betalen, zoals een echte gierige Nederlander. **Azure Static Web Apps** biedt een gratis tier die perfect is voor dit soort projecten. Je krijgt:

- Gratis hosting voor statische content
- Automatische SSL-certificaten
- Globale distributie via een CDN
- Naadloze integratie met GitHub Actions

De configuratie is minimaal. Een klein `staticwebapp.config.json`-bestand regelt de SPA-routing door alle verzoeken naar `index.html` door te sturen, met uitzonderingen voor statische bestanden zoals afbeeldingen.

Voor de DNS en extra caching heb ik **Cloudflare** ervoor gezet. Dat geeft een extra laag bescherming en snelheid, ook weer zonder kosten.

## Wat ik ervan geleerd heb

Dit project was een goede manier om bekend te raken met de nieuwere features van Angular, zoals signals en standalone components. Daarnaast was het opzetten van een volledige CI/CD-pipeline met GitHub Actions en Azure Static Web Apps leerzaam. Het is fijn om te zien dat je met gratis tooling een professionele workflow kunt neerzetten.

Het artikelsysteem met Markdown en frontmatter is daarnaast een patroon dat ik in toekomstige projecten zeker vaker ga toepassen. Het is simpel, flexibel, en de content staat gewoon in versiebeheer.

Mocht je benieuwd zijn naar de broncode, die is te vinden op [GitHub](https://github.com/devdanielsun/devdaniels-portfolio)
