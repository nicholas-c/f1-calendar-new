import styles from "./page.module.css";
import { Lato } from "next/font/google";
import { Sessions } from "@/components/sessions/sessions.component";
import { format, add } from "date-fns";
import { FutureRaces } from "@/components/future-races/future-races.component";
import { DriverStandings } from "@/components/driver-standings/driver-standings.component";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

async function getData() {
  const raceDataRequest = await fetch(
    `http://ergast.com/api/f1/${new Date().getUTCFullYear()}.json`,
    {
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  if (!raceDataRequest.ok) {
    throw new Error("Failed to fetch data");
  }

  const raceData = await raceDataRequest.json();

  const races = raceData.MRData.RaceTable.Races.reduce((accumulator, race) => {
    const sessions = race.Sprint
      ? {
          race: `${race.date} ${race.time}`,
          sprint: `${race.Sprint.date} ${race.Sprint.time}`,
          thirdPractice: `${race.SecondPractice.date} ${race.SecondPractice.time}`,
          qualifying: `${race.Qualifying.date} ${race.Qualifying.time}`,
          firstPractice: `${race.FirstPractice.date} ${race.FirstPractice.time}`,
        }
      : {
          race: `${race.date} ${race.time}`,
          qualifying: `${race.Qualifying.date} ${race.Qualifying.time}`,
          thirdPractice: `${race.ThirdPractice.date} ${race.ThirdPractice.time}`,
          secondPractice: `${race.SecondPractice.date} ${race.SecondPractice.time}`,
          firstPractice: `${race.FirstPractice.date} ${race.FirstPractice.time}`,
        };

    return [
      ...accumulator,
      {
        raceName: race.raceName,
        circuit: race.Circuit,
        sessions,
      },
    ];
  }, []);

  let currentRace = 0;

  const futureRaces = races.filter((race, i) => {
    const isFuture =
      new Date() < add(new Date(race.sessions.race), { hours: 3 });

    if (!isFuture) {
      currentRace = i + 1;

      if (currentRace === races.length) {
        currentRace = currentRace - 1;
      }
    }

    return isFuture;
  });

  return {
    futureRaces,
    nextRace: races[currentRace],
  };
}

export const revalidate = 60;

export default async function Home() {
  const { nextRace, futureRaces } = await getData();

  return (
    <main className={lato.className}>
      <div className={styles["next-race"]}>
        <h2 className={styles.upcoming}>upcoming race</h2>
        <div className={styles["race-details"]}>
          <h3 className={styles.trackName}>
            {nextRace.circuit.Location.country}
          </h3>

          <div className={styles["race-date"]}>
            <span className={styles.date}>
              {format(new Date(nextRace.sessions.firstPractice), "dd")}-
              {format(new Date(nextRace.sessions.race), "dd")}
            </span>

            <span className={styles.month}>
              {format(new Date(nextRace.sessions.race), "LLL").toUpperCase()}
            </span>
          </div>
        </div>

        <div className={styles.raceName}>{nextRace.circuit.circuitName}</div>

        <Sessions data={nextRace.sessions} raceName={nextRace.raceName} />
      </div>

      <div className={styles.info}>
        <h2 className={styles["info-title"]}>FUTURE RACES</h2>

        <FutureRaces futureRaces={futureRaces} />
      </div>

      <DriverStandings />
    </main>
  );
}
