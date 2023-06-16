"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { flags } from "@/utils/flags.util";
import Image from "next/image";

import styles from "./future-races.module.css";

export const FutureRaces = ({ futureRaces }) => {
  const IntlDate = Intl.DateTimeFormat();
  const [showUKTime, setShowUKTime] = useState(false);

  useEffect(() => {
    if (IntlDate.resolvedOptions().timeZone !== "Europe/London") {
      setShowUKTime(true);
    }
  }, [IntlDate]);

  return (
    <div className={styles.races}>
      {futureRaces.slice(1, futureRaces.length).map((race, i) => {
        const raceDate = new Date(race.sessions.race);

        return (
          <article className={styles.race} key={race.circuit.circuitId}>
            <Image
              height={33}
              width={50}
              alt={race.circuit.Location.country}
              src={flags[race.circuit.circuitId]}
              className={styles["race-image"]}
              priority={i < 3}
            />

            <div className={styles["session-details"]}>
              <h2 className={styles["session-details-title"]}>
                {race.raceName}
              </h2>
              <h3 className={styles["session-details-date"]}>
                {format(new Date(race.sessions.firstPractice), "dd")} -{" "}
                {format(raceDate, "dd LLLL YYY, kk:mm")}
                {showUKTime && (
                  <span>
                    (UK:{" "}
                    {Intl.DateTimeFormat("en-GB", {
                      hour: "numeric",
                      minute: "numeric",
                      timeZone: "Europe/London",
                    }).format(raceDate)}
                    )
                  </span>
                )}
              </h3>
            </div>
          </article>
        );
      })}
    </div>
  );
};
