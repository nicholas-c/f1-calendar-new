import styles from "./driver-standings.module.css";

const getData = async () => {
  const response = await fetch(
    "https://ergast.com/api/f1/2023/driverStandings.json"
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

export const DriverStandings = async () => {
  const data = await getData();

  //   console.log(data);

  return (
    <div className={styles["driver-standings"]}>
      <h2 className={styles.title}>Driver Standings</h2>

      <div className={styles["driver-table"]}>
        {data.map((driver) => {
          return (
            <div
              className={styles["driver-table-row"]}
              key={driver.Driver.driverId}
            >
              <div className={styles.driver}>
                <div className={styles.rank}>{driver.positionText}</div>

                <div>
                  {driver.Driver.givenName} {driver.Driver.familyName}
                  <br />
                  <span className={styles.constructor}>Mercedes</span>
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
