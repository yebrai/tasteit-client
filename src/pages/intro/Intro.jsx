import "./intro.css";
import headImg from "./intro-main.png";
import step1 from "./step-1.png"
import step2 from "./step-2.png"
import step3 from "./step-3.png"
import step4 from "./step-4.png"

function Intro() {
  return (
    <div>
      <section className="section-main">
        <section className="intro-start-container intro-section-container one">
          <div>
            <h1>Taste It!</h1>
            <p>
              Con esta app podras tanto pedir como vender tus propios platos!
            </p>
          </div>
          <img src={headImg} alt="" />
        </section>
        <section className="intro-steps-container intro-section-container two">
          <div className="intro-step">
            <h2>Paso 1</h2>
            <p>Seleciona tu comida preferida</p>
            <img src={step1} alt="" />
          </div>
          <div className="intro-step">
            <h2>Paso 2</h2>
            <p>Nos encargamos de enviarte la comida</p>
            <img src={step2} alt="" />
          </div>
          <div className="intro-step">
            <h2>Paso 3</h2>
            <p>Nuestros repartidores de entragaran la comida</p>
            <img src={step3} alt="" />
          </div>
          <div className="intro-step">
            <h2>Paso 4</h2>
            <p>Distruta de la comida y valora si te gusto la experiencia!</p>
            <img src={step4} alt="" />
          </div>
        </section>
        <section className="intro-text-container intro-section-container three">
          <div></div>
          <div></div>
        </section>
        <section className="intro-footer-container intro-section-container four">
          <div></div>
          <div></div>
        </section>
      </section>
    </div>
  );
}

export default Intro;
