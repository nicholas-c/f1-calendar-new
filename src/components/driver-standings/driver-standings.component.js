import styles from "./driver-standings.module.css";

const getData = async () => {
  const response = await fetch(
    "https://ergast.com/api/f1/2024/driverStandings.json"
  );

  if (!response.ok) {
    throw new Error("Error fetching driver standings");
  }

  const {
    MRData: {
      StandingsTable: { StandingsLists },
    },
  } = await response.json();

  return StandingsLists[0].DriverStandings;
};

const drivers = {
  hamilton: "Mercedes",
  russell: "Mercedes",
  alonso: "Aston Martin",
  stroll: "Aston Martin",
  bottas: "Alfa Romeo Racing",
  zhou: "Alfa Romeo Racing",
  hulkenberg: "Haas",
  kevin_magnussen: "Haas",
  leclerc: "Ferrari",
  sainz: "Ferrari",
  norris: "McLaren",
  piastri: "McLaren",
  perez: "Red Bull Racing",
  max_verstappen: "Red Bull Racing",
  sargeant: "Williams",
  albon: "Williams",
  gasly: "Alpine",
  ocon: "Alpine",
  tsunoda: "AlphaTauri",
  de_vries: "AlphaTauri",
  lawson: "AlphaTauri",
  ricciardo: "AlphaTauri",
};

const teams = {
  Mercedes: "#6CD3BF",
  "Red Bull Racing": "#3671C6",
  Ferrari: "#F91536",
  McLaren: "#F58020",
  Alpine: "#2293D1",
  AlphaTauri: "#5E8FAA",
  "Aston Martin": "#358C75",
  Williams: "#37BEDD",
  "Alfa Romeo Racing": "#C92D4B",
  Haas: "#B6BABD",
};

export const DriverStandings = async () => {
  const data = await getData();

  return (
    <div className={styles["driver-standings"]}>
      <h2 className={styles.title}>Driver Standings</h2>

      <div className={styles["driver-table"]}>
        {data.map((driver) => {
          return (
            <div
              className={styles["driver-table-row"]}
              key={driver.Driver.driverId}
              style={{
                "--team-color": teams[drivers[driver.Driver.driverId]],
              }}
            >
              <div className={styles.driver}>
                <div className={styles.rank}>{driver.positionText}</div>

                <div className={styles["driver-profile"]}>
                  {driver.Driver.givenName} {driver.Driver.familyName}
                  <br />
                  <span className={styles.constructor}>
                    {drivers[driver.Driver.driverId]}
                  </span>
                </div>
              </div>

              <div className={styles.points}>{driver.points}pts</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
