import axios from "axios";
import faker from "faker";
import { useSession } from "next-auth/react";
import session from "next-session";
import { useEffect, useState } from "react";
import Story from "./Story";

function Stories() {
  const { data: session } = useSession();
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=20")
      .then((res) =>
        res.data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          email: `${user.email}`,
          username: `${user.login.username}`,
          image: `${user.picture.thumbnail}`,
        }))
      )
      .then((users) => {
        setSuggestions(users);
      })
      .catch((e) => console.log(e));
    //     const suggestions = [...Array(20)].map((_, i) => ({
    //       ...faker.helpers.contextualCard(),
    //       id: i,
    //     }));
    //     console.log(suggestions);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll ">
      {/* <Story /> */}
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.image}
          username={profile.username}
        />
      ))}

      {/* <Stories /> */}
    </div>
  );
}

export default Stories;
