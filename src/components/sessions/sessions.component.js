"use client";
import { useState, useEffect } from "react";
import { format, add } from "date-fns";
import { Gear, Timer, FlagCheckered } from "phosphor-react";
import clsx from "clsx";

import styles from "./sessions.module.css";

const sessionTypes = {
  race: {
    name: "Race",
    icon: <FlagCheckered size={26} />,
    sessionLength: 3,
  },
  qualifying: {
    name: "Qualifying",
    icon: <Timer size={26} />,
    sessionLength: 1,
  },
  sprint: {
    name: "Sprint",
    icon: <Timer size={26} />,
    sessionLength: 1,
  },
  thirdPractice: {
    name: "Free Practice 3",
    icon: <Gear size={26} />,
    sessionLength: 1,
  },
  secondPractice: {
    name: "Free Practice 2",
    icon: <Gear size={26} />,
    sessionLength: 1,
  },
  firstPractice: {
    name: "Free Practice 1",
    icon: <Gear size={26} />,
    sessionLength: 1,
  },
};

export const Sessions = ({ data, raceName }) => {
  const IntlDate = Intl.DateTimeFormat();
  const [showUKTime, setShowUKTime] = useState(false);

  useEffect(() => {
    if (IntlDate.resolvedOptions().timeZone !== "Europe/London") {
      setShowUKTime(true);
    }
  }, [IntlDate]);

  return (
    <div className={styles.sessions}>
      {Object.entries(data).map(([sessionType, sessionDate]) => {
        const sessionStart = new Date(sessionDate);
        const sessionEnd = add(sessionStart, {
          hours: sessionTypes[sessionType].sessionLength,
        });

        const hasPast = new Date() >= sessionEnd;

        const inProgress =
          new Date() >= new Date(sessionStart) && new Date() < sessionEnd;

        return (
          <div
            className={clsx(styles.session, {
              [styles["session-finished"]]: hasPast,
              [styles["session-in-progress"]]: inProgress,
            })}
            key={sessionType}
          >
            {sessionTypes[sessionType].icon}

            <div>
              <div className={styles["session-date"]}>
                {format(sessionStart, "dd LLL, kk:mm")}

                {sessionType !== "race" && (
                  <> - {format(sessionEnd, "kk:mm")}</>
                )}

                {showUKTime && (
                  <span>
                    (UK:{" "}
                    {Intl.DateTimeFormat("en-GB", {
                      hour: "numeric",
                      minute: "numeric",
                      timeZone: "Europe/Paris",
                    }).format(sessionStart)}
                    {sessionType !== "race" && (
                      <>
                        {" "}
                        -{" "}
                        {Intl.DateTimeFormat("en-GB", {
                          hour: "numeric",
                          minute: "numeric",
                          timeZone: "Europe/Paris",
                        }).format(sessionEnd)}
                      </>
                    )}
                    )
                  </span>
                )}
              </div>

              <>
                {sessionTypes[sessionType].name}{" "}
                {sessionType === "race" && <> - {raceName}</>}
              </>
            </div>

            {inProgress && (
              <div className={clsx(styles["session-marker"])}>
                {inProgress && <>In progress</>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
