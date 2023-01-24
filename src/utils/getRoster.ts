import axios from "axios";

type GetRosterArgs = {
  id: number;
};

const getRoster = async ({ id: id }: GetRosterArgs) => {
  const baseUrl = `https://site.web.api.espn.com/apis/v2/sports/football/nfl/standings${id}`;
  const params = {
    enable: "roster",
  };
  const res = await axios.get(baseUrl, {
    params,
  });
  return res.data.team.athletes;
};

export default getRoster;