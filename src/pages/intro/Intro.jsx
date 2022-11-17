import "./intro.css";
import headImg from "./intro-main.png";
import step1 from "./step-1.png";
import step2 from "./step-2.png";
import step3 from "./step-3.png";
import step4 from "./step-4.png";
import emmaImg from "./emma.png";
import jhonImg from "./john.png";
import silviaImg from "./silvia.png";
import valoracion from "./estrella.png";
import linkedin from "./in.png";
import github from "./git.png";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <div className="intro">
      <section className="section-main">
        <section className="intro-start-container intro-section-container">
          <div className="main-head">
            <h1>Taste It!</h1>
            <p>
              Con esta app podras tanto pedir como vender tus propios platos!
            </p>
            <div className="button-container">
             <Link className="main-head-link" to="/home">Comienza ahora!!</Link>
            </div>
          </div>
          <img src={headImg} alt="" />
        </section>
        <section className="intro-steps-container intro-section-container">
          <div className="intro-step">
            <h2>1º Paso</h2>
            <p>Seleciona tu comida preferida</p>
            <img src={step1} alt="" />
          </div>
          <div className="intro-step">
            <h2>2º Paso</h2>
            <p>Nos encargamos de enviarte la comida</p>
            <img src={step2} alt="" />
          </div>
          <div className="intro-step">
            <h2>3º Paso</h2>
            <p>Nuestros repartidores te la entregaran</p>
            <img src={step3} alt="" />
          </div>
          <div className="intro-step">
            <h2>4º Paso</h2>
            <p>Distruta de la comida y valora si te gusto la experiencia!</p>
            <img src={step4} alt="" />
          </div>
        </section>
        <section className="intro-footer-container intro-section-container bottom-page">
          <section className="users-valoration">
            <div className="top-footer-title">
              <h1>Valoraciones de nuestros usuarios</h1>
            </div>
            <div className="valoration-container">
              <div>
                <img className="userImg" src={emmaImg} alt="" />
                <h2>Emma</h2>
                <div className="valoration">
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <p>chapo</p>
                </div>
              </div>
              <div>
                <img className="userImg" src={jhonImg} alt="" />
                <h2>John Doe</h2>
                <div className="valoration">
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <p>chapo</p>
                </div>
              </div>
              <div>
                <img className="userImg" src={silviaImg} alt="" />
                <h2>Silvia</h2>
                <div className="valoration">
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <p>chapo</p>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <div className="developers-container">
              <h4 className="header-footer">Desarrolladores</h4>
              <div>
                <img src={linkedin} alt="" />
                <p>Ivan Garcia Yebra</p>
                <img src={github} alt="" />
              </div>
              <div>
                <img src={linkedin} alt="" />
                <p>Borja Cabello Luna</p>
                <img src={github} alt="" />
              </div>
            </div>
            <div>
              <h4 className="header-footer">Contactanos</h4>
              <div>
                <img src="" alt="" />
                <p>support@tasteit.com</p>
              </div>
              <div>
                <img src="" alt="" />
                <p>+34 611 11 11 11</p>
              </div>
            </div>
          </footer>
            <p>© Copyright Taste it 2022</p>
        </section>
      </section>
    </div>
  );
}

export default Intro;
