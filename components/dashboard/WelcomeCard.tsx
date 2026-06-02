"use client";

import React from "react";
import Image from "next/image";
import styles from "./WelcomeCard.module.css";

interface WelcomeCardProps {
  user: any;
  analytics: any;
}

export default function WelcomeCard({user, analytics}: WelcomeCardProps) {
  return (
    <div className={styles.welcomeCard}>
      <div className={styles.welcomeText}>
        <h1 className={styles.welcomeTitle}>Hi, {user?.name ?? "there"} 👋</h1>

        <p className={styles.welcomeSubtitle}>
          What do your expenses look like today?
        </p>

        <p className={styles.welcomeInsight}>
          You have spent{" "}
          <span className={styles.highlight}>
            ₦{(analytics?.overview?.totalExpenses ?? 0).toLocaleString()}
          </span>{" "}
          this month.
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