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
import phone from "./phone.png";
import email from "./email.png";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <div className="intro">
      <section className="section-main">
        <section className="intro-start-container intro-section-container">
          <div className="main-head">
            <h1>Taste It!</h1>
            <p>
              Compra y vende tus platos favoritos
            </p>
            <div className="button-container">
             <Link className="link-profile intro-link-start" to="/home">Comienza ahora</Link>
            </div>
          </div>
          <img  src={headImg} alt="" />
        </section>
        <section className="intro-steps-container intro-section-container">
          <div className="intro-step step1">
            <h2>1º</h2>
            <p>Selecciona tu comida preferida</p>
            <img src={step1} alt="" />
          </div>
          <div className="intro-step step2">
            <h2>2º</h2>
            <p>Nos encargamos de enviarte la comida</p>
            <img src={step2} alt="" />
          </div>
          <div className="intro-step step3">
            <h2>3º</h2>
            <p>Nuestros repartidores te la entregarán</p>
            <img src={step3} alt="" />
          </div>
          <div className="intro-step step4">
            <h2>4º</h2>
            <p>¡Distruta de la comida y valora si te gustó la experiencia!</p>
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
                <div>
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  </div>
                  <p>¡El pedido fue rápido y la atención fue excelente!</p>
                </div>
              </div>
              <div>
                <img className="userImg" src={jhonImg} alt="" />
                <h2>John Doe</h2>
                <div className="valoration"><div>
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  </div>
                  <p>La comida más deliciosa de la ciudad en tu casa.</p>
                </div>
              </div>
              <div>
                <img className="userImg" src={silviaImg} alt="" />
                <h2>Silvia</h2>
                <div className="valoration">
                <div>
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  <img src={valoracion} alt="" />
                  </div>
                  <p>Siempre me sobraba comida y ahora puedo sacarle partido en vez de tirarla.</p>
                </div>
              </div>
            </div>
          </section>
          <footer>
            <div className="developers-container">
              <h4 className="header-footer">Desarrollado por:</h4>
              <div>
                <a href="https://www.linkedin.com/in/ivangarciayebra/"><img src={linkedin} alt="" /></a>
                <p>Ivan Garcia Yebra</p>
                <a  href="https://github.com/yebrai"><img src={github}  alt="" /></a>
              </div>
              <div>
                <a href="https://www.linkedin.com/in/borja-cabello-luna-8b5536197/"><img src={linkedin} alt="" /></a>
                <p>Borja Cabello Luna</p>
                <a href="https://github.com/borjacabello"><img src={github} alt="" /></a>
              </div>
            </div>
            <div className="footer-contacts">
              <h4 className="header-footer">Contáctanos</h4>
              <div>
                <img className="email-img" src={email} alt="" />
                <p>support@tasteit.com</p>
              </div>
              <div className="phone-container">
                <img className="phone-img" src={phone} alt="" />
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
