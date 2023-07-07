import numStr from "../../components/numStr"

function CustomTooltipCadence ({active, label, payload}) {
    if (active) {
        if (payload[2] === undefined) {
            return (
                <div className="tooltip">
                    <p className="tooltipElement bold" >{label}</p>
                    <p className="tooltipElement">{`Cadence réelle : ${numStr((payload[0].value).toFixed(0), ".")} pcs/h`}</p>
                    <p className="tooltipElement">{`Cadence théorique : ${numStr((payload[1].value).toFixed(0), ".")} pcs/h`}</p>
                </div>
            )
        } else {
            return (
                <div className="tooltip">
                    <p className="tooltipElement bold" >{label}</p>
                    <p className="tooltipElement">{`Cadence réelle : ${numStr((payload[0].value).toFixed(0), ".")} pcs/h`}</p>
                    <p className="tooltipElement">{`Cadence théorique : ${numStr((payload[1].value).toFixed(0), ".")} pcs/h`}</p>
                    <p className="tooltipElement">{`Tendance : ${numStr((payload[2].value).toFixed(0), ".")} pcs/h`}</p>
                </div>
            )
        }
    }
    return null
}

export default CustomTooltipCadence