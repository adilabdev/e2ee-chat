import {
  formatTime,
} from "../../shared/utils/time";

export default function MessageList({
  messages,
  currentUser,
}) {
  return (
    <div>
      {messages.map((m) => {
        const mine =
          m.from === currentUser;

        return (
          <div
            key={m.id}
            style={{
              marginBottom: 20,

              borderBottom:
                "1px solid #ddd",

              paddingBottom: 12,
            }}
          >
            <div>
              <strong>
                {m.from}
              </strong>
              : {m.content}
            </div>

            <div
              style={{
                fontSize: 12,
                color: "gray",
                marginTop: 8,
              }}
            >
              {mine && (
                <div>
                  status:
                  {" "}
                  {m.status}
                </div>
              )}

              {m.sentAt && (
                <div>
                  sent:
                  {" "}
                  {formatTime(
                    m.sentAt
                  )}
                </div>
              )}

              {m.deliveredAt && (
                <div>
                  delivered:
                  {" "}
                  {formatTime(
                    m.deliveredAt
                  )}
                </div>
              )}

              {m.readAt && (
                <div>
                  read:
                  {" "}
                  {formatTime(
                    m.readAt
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}