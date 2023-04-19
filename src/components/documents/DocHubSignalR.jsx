import { useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";

export default function useSignalR(url) {
  const [connection, setConnection] = useState(undefined);

  useEffect(() => {
    let canceled = false;
    const connection = new HubConnectionBuilder()
      .withUrl(url, {
        withCredentials: true, // set to true if you're passing authentication cookies with the request
        skipNegotiation: true, // skip the negotiation process and use the default SignalR JSON protocol
        transport: signalR.HttpTransportType.WebSockets // specify the transport to be used by SignalR
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => {
        if (!canceled) {
          setConnection(connection);
        }
      })
      .catch((error) => {
        console.log("signal error", error);
      });

    connection.onclose((error) => {
      if (canceled) {
        return;
      }
      console.log("signal closed");
      setConnection(undefined);
    });

    connection.onreconnecting((error) => {
      if (canceled) {
        return;
      }
      console.log("signal reconnecting");
      setConnection(undefined);
    });

    connection.onreconnected((error) => {
      if (canceled) {
        return;
      }
      console.log("signal reconnected");
      setConnection(connection);
    });

    // Clean up the connection when the component unmounts
    return () => {
      canceled = true;
      connection.stop();
    };
  }, [url]);

  return { connection };
}
