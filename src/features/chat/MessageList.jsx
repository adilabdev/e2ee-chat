export default function MessageList({
  messages,
  currentUser,
}) {
  const format = (t) => {
    if (!t) return "";
    return new Date(t).toLocaleTimeString();
  };

  return (
    <div>
      {messages.map((m) => {
        const mine =
          m.from === currentUser;

        return (
          <div
            key={m.id}
            style={{ marginBottom: 14 }}
          >
            <div>
              {m.from}: {m.content}
            </div>

            <div
              style={{
                fontSize: 12,
                color: "gray",
              }}
            >
              {mine ? (
                <>
                  {m.sentAt && (
                    <div>
                      sent: {format(m.sentAt)}
                    </div>
                  )}

                  {m.deliveredAt && (
                    <div>
                      delivered:{" "}
                      {format(m.deliveredAt)}
                    </div>
                  )}

                  {m.readAt && (
                    <div>
                      read: {format(m.readAt)}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {m.deliveredAt && (
                    <div>
                      delivered:{" "}
                      {format(m.deliveredAt)}
                    </div>
                  )}

                  {m.readAt && (
                    <div>
                      read: {format(m.readAt)}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}