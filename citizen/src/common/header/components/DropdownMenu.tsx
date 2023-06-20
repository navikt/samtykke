import { Hamburger } from '@navikt/ds-icons'
import { Button, Dropdown } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DropdownMenu(): ReactElement {

    const navigate = useNavigate()

    return (
        <Dropdown>
            <Button 
                variant="secondary" 
                as={Dropdown.Toggle} 
                icon={<Hamburger aria-hidden />} 
            />
            <Dropdown.Menu>
                <Dropdown.Menu.List>
                    <Dropdown.Menu.List.Item
                        onClick={() => navigate('/samtykker')}
                    >
                        Se aktive samtykker
                    </Dropdown.Menu.List.Item>
                </Dropdown.Menu.List>
                <Dropdown.Menu.Divider />
                <Dropdown.Menu.List>
                    <Dropdown.Menu.List.Item
                        onClick={() => window.location.replace('/innbygger/oauth2/logout')}
                    >
                        Logg ut
                    </Dropdown.Menu.List.Item>
                </Dropdown.Menu.List>
            </Dropdown.Menu>
        </Dropdown>
    )
}