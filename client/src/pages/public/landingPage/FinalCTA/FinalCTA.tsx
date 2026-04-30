import Button from "../../../../components/ui/Button/Button";
import laborLogo from '../../../../assets/logo/laborLogo.svg'

import './FinalCTA.css'

function FinalCTA() {
    return(
        <section className="final-cta">
            <span className="final-cta__hide"></span>
            <div className="final-cta__container">
                {/* TODO: importer le logo */}
                <img className="final-cta__image" src={laborLogo}    alt="" />
                <div className="final-cta__text-container">
                    <h2 className="final-cta__title">Rejoignez  la communauté agricole</h2>
                    <p className="final-cta__text">Lorem ipsum  dolor sit amet, consectetur adipiscing   elit. Aliquam convallis tortor orci, vel  luctus eros pharetra a. Mauris non ultrices  nulla. Quisque quis rhoncus nunc. Donec  malesuada facilisis lacus, nec viverra   justo. </p>
                    {/* TODO : transformer en lien vers /   register quand le routing sera prêt */}
                    <Button className='.final-cta__btn' variant="primary"   size="l">S'inscrire</Button>
                </div>
            </div>
            <span className="final-cta__hide"></span>
     
        </section>
    )
}

export default FinalCTA