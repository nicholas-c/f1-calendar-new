import { format, add } from "date-fns";
import { flags } from "@/utils/flags.util";
import Image from "next/image";

import styles from "./future-races.module.css";

export const FutureRaces = ({ futureRaces }) => {
  return (
    <div className={styles.races}>
      {futureRaces.slice(1, futureRaces.length).map((race) => (
        <article className={styles.race} key={race.circuit.circuitId}>
          <Image
            height={33}
            width={50}
            alt={race.circuit.Location.country}
            src={flags[race.circuit.circuitId]}
            className={styles["race-image"]}
          />

          <div className={styles["session-details"]}>
            <h2 className={styles["session-details-title"]}>{race.raceName}</h2>
            <h3 className={styles["session-details-date"]}>
              {format(new Date(race.sessions.firstPractice), "dd")} -{" "}
              {format(new Date(race.sessions.race), "dd LLLL YYY, kk:mm")}
            </h3>
          </div>
        </article>
      ))}
    </div>
  );
};
