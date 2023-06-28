import React from "react";
import Image from "next/image";
import styles from "./free-and-fun.module.css";

function FreeAndFun() {
  return (
    <div className={styles.freeAndFun}>
      <div>
        <h2>Españolified is FREE!</h2>
        <Image
          className={styles.image}
          src="/images/welcome/save-money-trans.png"
          alt="piggy bank"
          width={200}
          height={200}
        />
        <p>
          Billions of dollars are spent annually on highly ineffective language
          apps that leave people destitute, homeless, and starving.
        </p>
      </div>
      <div>
        <h2>Españolified is FUN!</h2>
        <Image
          className={styles.image}
          src="/images/welcome/happy-monkey-trans.png"
          alt="happy monkey"
          width={200}
          height={200}
        />
        <p>
          With our app, not only will you build language skills at an alarming
          pace, but we guarantee you will really enjoy the experience!
        </p>
      </div>
      <div>
        <h2>Españolified is SCIENCE!</h2>
        <Image
          className={styles.image}
          src="/images/welcome/panda-science-trans.png"
          alt="panda science"
          width={200}
          height={200}
        />
        <p>
          We spent years researching how the brain learns and have honed in on
          an optimized technique that is guaranteed to work.
        </p>
      </div>
    </div>
  );
}

export default FreeAndFun;
