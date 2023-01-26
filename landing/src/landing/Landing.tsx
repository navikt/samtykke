import { Right } from '@navikt/ds-icons'
import { Ingress, Button, Heading } from '@navikt/ds-react'
import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import reops from '../assets/reops.png'

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
            </div>
            <img
                src={reops}
                alt="Illustrasjon av mennesker som bærer forskjellige geometrisk objekter."
            />
        </div>
    )
}
