// import { gql, useMutation, useQuery } from "@apollo/client";
// import React from "react";
// import { useSearchParams } from "react-router-dom";

// const GET_USER = gql`
//   query getUser($username: String!) {
//     getUser(username: $username) {
//       coins
//     }
//   }
// `;

// const UPDATE_COINS = gql`
//   mutation updateUserCoins($username: String!, $coins: Int!) {
//     updateUserCoins(username: $username, coins: $coins) {
//       coins
//     }
//   }
// `;

// const ClickerGame: React.FC = () => {
//   const [searchParams] = useSearchParams();
//   const username = searchParams.get("username") || "";

//   const { data, refetch } = useQuery(GET_USER, {
//     variables: { username },
//     skip: !username, // Skip query if no username is provided
//   });

//   const [updateCoins] = useMutation(UPDATE_COINS);

//   const handleClick = () => {
//     if (data?.getUser?.coins !== undefined) {
//       updateCoins({ variables: { username, coins: data.getUser.coins + 1 } });
//       refetch();
//     }
//   };

//   if (!username) {
//     return <div>Error: Username not provided</div>;
//   }

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Welcome! {username}</h1>
//       <h1>Total Coins: {data?.getUser?.coins || 0}</h1>
//       <button
//         onClick={handleClick}
//         style={{
//           fontSize: "24px",
//           padding: "20px",
//           borderRadius: "10px",
//           cursor: "pointer",
//         }}
//       >
//         Tap to Earn Coins
//       </button>
//     </div>
//   );
// };

// export default ClickerGame;

import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, CircularProgress, Container, Typography } from "@mui/material";
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

  const { data, refetch, loading } = useQuery(GET_USER, {
    variables: { username },
    skip: !username,
  });

  const [updateCoins] = useMutation(UPDATE_COINS);

  const handleClick = () => {
    if (data?.getUser?.coins !== undefined) {
      updateCoins({ variables: { username, coins: data.getUser.coins + 1 } });
      refetch();
    }
  };

  if (!username) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Error: Username not provided
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h4">Welcome, {username}!</Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Total Coins: {data?.getUser?.coins || 0}
          </Typography>
          <Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            sx={{
              mt: 4,
              fontSize: "1.5rem",
              padding: "16px 32px",
              borderRadius: "8px",
            }}
          >
            Tap to Earn Coins
          </Button>
        </>
      )}
    </Container>
  );
};

export default ClickerGame;
