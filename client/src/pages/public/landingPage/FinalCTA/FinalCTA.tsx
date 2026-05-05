import { Link } from 'react-router-dom'
import Button from "../../../../components/ui/Button/Button";
import laborLogo from '../../../../assets/logo/laborLogo.svg'

import './FinalCTA.css'

function FinalCTA() {
    return(
        <section className="final-cta">
            <span className="final-cta__hide"></span>
            <div className="final-cta__container">
                <img className="final-cta__image" src={laborLogo}    alt="" />
                <div className="final-cta__text-container">
                    <h2 className="final-cta__title">Rejoignez  la communauté agricole</h2>
                    <p className="final-cta__text">Lorem ipsum  dolor sit amet, consectetur adipiscing   elit. Aliquam convallis tortor orci, vel  luctus eros pharetra a. Mauris non ultrices  nulla. Quisque quis rhoncus nunc. Donec  malesuada facilisis lacus, nec viverra   justo. </p>
                    <Link to="/inscription" className="final-cta__cta-link">
                        <Button variant="primary" size="l">S'inscrire</Button>
                    </Link>
                </div>
            </div>
            <span className="final-cta__hide"></span>
     
        </section>
    )
}

export default FinalCTA