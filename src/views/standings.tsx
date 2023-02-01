import { List } from "@raycast/api";
import useStandings from "../hooks/useStandings";
import TeamComponent from "../components/Team";

const Standings = () => {
  const { data, isLoading } = useStandings();
  console.log(data?.afc);
  return (
    <List isLoading={isLoading}>
      <List.Section title="AFC (American Football Conference)">
        {(data?.afc ?? []).map((team) => {
          return <TeamComponent key={team.id} team={team} />;
        })}
      </List.Section>
      <List.Section title="NFC (National Football Conference)">
        {(data?.nfc ?? []).map((team) => {
          return <TeamComponent key={team.id} team={team} />;
        })}
      </List.Section>
    </List>
  );
};

export default Standings;
