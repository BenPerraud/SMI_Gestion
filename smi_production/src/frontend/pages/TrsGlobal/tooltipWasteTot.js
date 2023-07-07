function CustomTooltipWasteTot ({active, label, payload}) {
    if (active) {
        if (payload[1] === undefined) {
            return (
                <div className="tooltip">
                    <p className="tooltipElement bold" >{label}</p>
                    <p className="tooltipElement">{`Taux de rebut : ${(payload[0].value).toFixed(1)}%`}</p>
                </div>
            )
        } else {
            return (
                <div className="tooltip">
                    <p className="tooltipElement bold" >{label}</p>
                    <p className="tooltipElement">{`Taux de rebut : ${(payload[0].value).toFixed(1)}%`}</p>
                    <p className="tooltipElement">{`Tendance : ${(payload[1].value).toFixed(1)}%`}</p>
                </div>
            )
        }
    }
    return null
}

export default CustomTooltipWasteTot