// import { gql, useMutation, useQuery } from "@apollo/client";
// import { Button, CircularProgress, Container, Typography } from "@mui/material";
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

//   const { data, refetch, loading } = useQuery(GET_USER, {
//     variables: { username },
//     skip: !username,
//   });

//   const [updateCoins] = useMutation(UPDATE_COINS);

//   const handleClick = () => {
//     if (data?.getUser?.coins !== undefined) {
//       updateCoins({ variables: { username, coins: data.getUser.coins + 1 } });
//       refetch();
//     }
//   };

//   if (!username) {
//     return (
//       <Container>
//         <Typography variant="h6" color="error">
//           Error: Username not provided
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <>
//           <Typography variant="h4">Welcome, {username}!</Typography>
//           <Typography variant="h5" sx={{ mt: 2 }}>
//             Total Coins: {data?.getUser?.coins || 0}
//           </Typography>
//           <Button
//             onClick={handleClick}
//             variant="contained"
//             color="primary"
//             sx={{
//               mt: 4,
//               fontSize: "1.5rem",
//               padding: "16px 32px",
//               borderRadius: "8px",
//             }}
//           >
//             Tap to Earn Coins
//           </Button>
//         </>
//       )}
//     </Container>
//   );
// };

// export default ClickerGame;

// src/components/ClickerGame.tsx
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineCoins, setOfflineCoins] = useState<number>(0);
  const [showOfflineAlert, setShowOfflineAlert] = useState(false);
  const [showSyncAlert, setShowSyncAlert] = useState(false);

  // Detect offline/online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineAlert(false);
      syncOfflineCoins();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineAlert(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle the syncing of offline coins with the server
  const syncOfflineCoins = async () => {
    const storedCoins = parseInt(
      localStorage.getItem("offlineCoins") || "0",
      10
    );

    if (storedCoins > 0) {
      try {
        const newTotalCoins = data.getUser.coins + storedCoins;
        await updateCoins({ variables: { username, coins: newTotalCoins } });
        refetch(); // Update UI with synced coins
        localStorage.removeItem("offlineCoins");
        setShowSyncAlert(true);
      } catch (error) {
        console.error("Error syncing offline coins:", error);
        // Gracefully handle error (maybe retry later)
      }
    }
  };

  // Handle coin increment
  const handleClick = () => {
    if (!isOnline) {
      // Offline Mode: Store coins locally
      const newOfflineCoins = offlineCoins + 1;
      setOfflineCoins(newOfflineCoins);
      localStorage.setItem("offlineCoins", String(newOfflineCoins));
    } else if (data?.getUser?.coins !== undefined) {
      // Online Mode: Directly update on the server
      updateCoins({ variables: { username, coins: data.getUser.coins + 1 } });
      refetch();
    }
  };

  // UI for when the user is offline
  const offlineBanner = !isOnline ? (
    <Snackbar
      open={showOfflineAlert}
      autoHideDuration={6000}
      onClose={() => setShowOfflineAlert(false)}
    >
      <Alert severity="warning">
        You are offline. Any taps will be saved and synced when you reconnect.
      </Alert>
    </Snackbar>
  ) : null;

  // UI for when offline coins are synced
  const syncBanner = (
    <Snackbar
      open={showSyncAlert}
      autoHideDuration={6000}
      onClose={() => setShowSyncAlert(false)}
    >
      <Alert severity="success">Offline coins have been synced!</Alert>
    </Snackbar>
  );

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
          <Typography variant="h6" sx={{ mt: 2 }}>
            Offline Coins: {offlineCoins}
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
      {offlineBanner}
      {syncBanner}
    </Container>
  );
};

export default ClickerGame;
