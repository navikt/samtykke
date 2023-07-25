# citizen
React app for innbygger siden i NAV's digitale samtykkeløsning for brukertester. Appen avhenger av [Aksel](https://aksel.nav.no/), NAV's designsystem for gjenbruk av komponenter.

## Kom i gang med utvikling

### Forutsetninger
- Node v18+
- Yarn v1.22+

### Kjør appen lokalt
Appen kan kjøres lokalt både uten eller med mock data, for å kjøre uten mock data må [samtykke-api](https://github.com/navikt/samtykke-api) kjøres lokalt for å oppnå forventet adferd fra appen.

Last ned avhengigheter \
`yarn install`

Kjør uten mock data \
`yarn dev`

Kjør med mock data \
`yarn dev:mock` 

Åpne appen med følgende URL: [http://localhost:5173/innbygger/]() i en nettleser.

### Kjør testing
Ende-til-ende tester kjøres med cypress, som krever at appen kjøres lokalt først.

Kjør tester via cypress konsollen \
`yarn e2e:open`

Kjør tester direkte i terminal \
`yarn e2e:run`

### Testmiljø på NAIS
Appen's testmiljø kjører i `dev-gcp` clusteret på NAIS, og skal i utgangspunkten bli nådd fra [https://samtykke.ekstern.dev.nav.no/innbygger/]().

For å inspisere appen i `dev-gcp` må [naisdevice](https://doc.nais.io/device/) være aktivert og du må være medlem av team-reasearchops. Kontakt i `#researchops` eller `#samtykke-løsning` på Slack for å få tilgang.