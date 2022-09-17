import { PowerBIEmbed } from "powerbi-client-react";
import { memo } from "react";

const Past = () => {
  return (
    <div>
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual and qna
          id: undefined,
          embedUrl: undefined,
          accessToken: undefined, // Keep as empty string, null or undefined
          // tokenType: models.TokenType.Embed
        }}
      />
      {/* <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual and qna
          id: "<Report Id>",
          embedUrl: "<Embed Url>",
          accessToken: "<Access Token>",
          tokenType: models.TokenType.Embed,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
            background: models.BackgroundType.Transparent,
          },
        }}
        eventHandlers={
          new Map([
            [
              "loaded",
              function () {
                console.log("Report loaded");
              },
            ],
            [
              "rendered",
              function () {
                console.log("Report rendered");
              },
            ],
            [
              "error",
              function (event) {
                console.log(event.detail);
              },
            ],
          ])
        }
        cssClassName={"report-style-class"}

        // getEmbeddedComponent = { (embeddedReport) => {
        // 	this.report = embeddedReport as Report;
        // }}
      /> */}
    </div>
  );
};

export default memo(Past);
