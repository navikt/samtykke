import { Right } from '@navikt/ds-icons'
import { Ingress, Button, Heading } from '@navikt/ds-react'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import reops800AVIF from '../assets/reops-800.avif'
import reops1280AVIF from '../assets/reops-1280.avif'
import reops2560AVIF from '../assets/reops-2560.avif'
import reops800WebP from '../assets/reops-800.webp'
import reops1280WebP from '../assets/reops-1280.webp'
import reops2560WebP from '../assets/reops-2560.webp'
import reops800JPEG from '../assets/reops-800.jpg'
import reops1280JPEG from '../assets/reops-1280.jpg'
import reops2560JPEG from '../assets/reops-2560.jpg'

export default function Landing(): ReactElement {
    const navigate = useNavigate()

    return (
        <div className="bg-[#75c4c5] px-4 py-12 flex-1">
            <div className="max-w-screen-xl mx-auto">
                <div className="max-w-prose mx-auto text-center grid gap-4 justify-items-center">
                    <Heading level="1" size="xlarge">
                        Gi ditt samtykke
                    </Heading>
                    <Ingress className="text-center">
                        I samtykke-løsningen kan du gi ditt digitale samtykke
                        til brukertester og innsiktsarbeid for forbedringen av
                        NAVs tjenester
                    </Ingress>
                    <Button
                        icon={<Right aria-hidden />}
                        iconPosition="right"
                        onClick={() => navigate('/innlogging')}
                    >
                        Til samtykke
                    </Button>
                </div>
                <picture>
                    <source
                        srcSet={`${reops800AVIF} 800w, ${reops1280AVIF} 1280w`}
                        sizes="(max-width: 1280px) 1280px, 100vw"
                        type="image/avif"
                    />
                    <source
                        srcSet={`${reops800WebP} 800w, ${reops1280WebP} 1280w`}
                        sizes="(max-width: 1280px) 1280px, 100vw"
                        type="image/webp"
                    />
                    <source
                        srcSet={`${reops800JPEG} 800w, ${reops1280JPEG} 1280w`}
                        sizes="(max-width: 1280px) 1280px, 100vw"
                        type="image/jpeg"
                    />
                    <img
                        src={reops800JPEG}
                        alt="Illustrasjon av mennesker som bærer forskjellige geometrisk objekter."
                    />
                </picture>
            </div>
        </div>
    )
}
