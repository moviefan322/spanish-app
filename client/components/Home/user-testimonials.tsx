import React from "react";
import Image from "next/image";
import styles from "./user-testimonials.module.css";

function UserTestimonials() {
  return (
    <>
      <h3 className={styles.header}>User Testimonials</h3>
      <div className={styles.userTestimonials}>
        <div>
          <Image
            className={styles.userImage}
            src="/images/users/model1.png"
            alt="user1"
            width={220}
            height={220}
          />
          <h4>Sarah Fotze</h4>
          <p>
            &quot;I went from speaking no Spanish at all to being completely
            fluent in only 15 days. Españolified is amazing!&quot;
          </p>
        </div>
        <div>
          <Image
            className={styles.userImage}
            src="/images/users/model3.png"
            alt="user1"
            width={220}
            height={220}
          />
          <h4>Bret Steel</h4>
          <p>
            &quot;After learning Spanish with Españolified, I no longer get
            ripped off on stuff when I go to Colombia.&quot;
          </p>
        </div>
        <div>
          <Image
            className={styles.userImage}
            src="/images/users/model2.png"
            alt="user1"
            width={220}
            height={220}
          />
          <h4>Kim Blaze</h4>
          <p>
            &quot;Españolified opened a lot of doors for me, I recommend it to
            anyone that wants to become fluent fast!&quot;
          </p>
        </div>
      </div>
    </>
  );
}

export default UserTestimonials;
