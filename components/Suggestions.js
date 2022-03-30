import axios from "axios";
import { useState, useEffect } from "react";
function Suggestions() {
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
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestion for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.slice(0, 5).map((user) => (
        <div key={user.id} className="flex items-center justify-between mt-3">
          <img
            className="w-10 h-10 rounded-full border p-[2px]"
            src={user.image}
            alt=""
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm ">{user.username}</h2>
            <h3 className="text-xs text-gray-400">Works at {user.caption}</h3>
          </div>
          <div>
            <button className="text-blue-400 text-xs font-bold">Follow</button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Suggestions;
