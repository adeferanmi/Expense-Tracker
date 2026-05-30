"use client";

import React from "react";
import Image from "next/image";
import styles from "./WelcomeCard.module.css";

export default function WelcomeCard() {
  return (
    <div className={styles.welcomeCard}>
      <div className={styles.welcomeText}>
        <h1 className={styles.welcomeTitle}>Hi, there! 👋</h1>

        <p className={styles.welcomeSubtitle}>
          What do your expenses look like today?
        </p>

        <p className={styles.welcomeInsight}>
          You have spent <span className={styles.highlight}>₦145,000</span> this month - that's <span className={styles.highlight}>58%</span> of your budget.
        </p>
      </div>

      <div className={styles.welcomePicture}>
        <div className={styles.bearPicture}>
          <Image 
            src="/newbear.png"
            width={300} 
            height={300} 
            alt="waving-bear"
            priority
          />
        </div>
      </div>
    </div>
  );
}