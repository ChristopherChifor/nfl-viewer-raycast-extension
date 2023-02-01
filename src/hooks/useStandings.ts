import getStandings from "../utils/getStandings";
import { useCallback } from "react";
import { Team } from "../types/standings.types";
import { useCachedPromise } from "@raycast/utils";

const useStandings = () => {
  const fetchTeamStandings = useCallback(async () => {
    console.debug("getting standings...");
    const data = await getStandings({ year: new Date().getUTCFullYear().toString(), group: "conference" });

    const afc: Array<Team> = data.children[0].standings.entries
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((data: any) => {
        return {
          id: data.team.id,
          name: data.team.displayName,
          logo: data.team.logos[0].href,
          link: data.team.links[0].href,
          rank: data.stats[7].value,
          wins: data.stats[10].value,
          losses: data.stats[6].value,
        };
      })
      .sort((a: Team, b: Team) => {
        return a.rank - b.rank;
      });

    console.debug(">>", afc);
    const nfc: Array<Team> = data.children[1].standings.entries
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((data: any) => {
        return {
          id: data.team.id,
          name: data.team.displayName,
          logo: data.team.logos[0].href,
          link: data.team.links[0].href,
          rank: data.stats[7].value,
          wins: data.stats[10].value,
          losses: data.stats[6].value,
        };
      })
      .sort((a: Team, b: Team) => {
        return a.rank - b.rank;
      });

    return { afc, nfc };
  }, []);

  return useCachedPromise(fetchTeamStandings);
};

export default useStandings;
