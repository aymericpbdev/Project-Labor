import Button from "../../../../components/ui/Button/Button";

import './FinalCTA.css'

function FinalCTA() {
    return(
        <section className="final-cta">
            {/* TODO: importer le logo */}
            <img className="final-cta__image" src="" alt="" />
            <div className="final-cta__text-container">
                <h2 className="final-cta__title">Rejoignez la communauté agricole</h2>
                <p className="final-cta__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis tortor orci, vel luctus eros pharetra a. Mauris non ultrices nulla. Quisque quis rhoncus nunc. Donec malesuada facilisis lacus, nec viverra justo. </p>
                {/* TODO : transformer en lien vers /register quand le routing sera prêt */}
                <Button variant="primary" size="l">S'inscrire</Button>
            </div>
        </section>
    )
}

export default FinalCTA