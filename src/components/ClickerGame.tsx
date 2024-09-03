import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useSearchParams } from "react-router-dom";

const GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      coins
    }
  }
`;

const UPDATE_COINS = gql`
  mutation updateUserCoins($username: String!, $coins: Int!) {
    updateUserCoins(username: $username, coins: $coins) {
      coins
    }
  }
`;

const ClickerGame: React.FC = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username") || "";

  const { data, refetch } = useQuery(GET_USER, {
    variables: { username },
    skip: !username, // Skip query if no username is provided
  });

  const [updateCoins] = useMutation(UPDATE_COINS);

  const handleClick = () => {
    if (data?.getUser?.coins !== undefined) {
      updateCoins({ variables: { username, coins: data.getUser.coins + 1 } });
      refetch();
    }
  };

  if (!username) {
    return <div>Error: Username not provided</div>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Total Coins: {data?.getUser?.coins || 0}</h1>
      <button
        onClick={handleClick}
        style={{
          fontSize: "24px",
          padding: "20px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Tap to Earn Coins
      </button>
    </div>
  );
};

export default ClickerGame;
