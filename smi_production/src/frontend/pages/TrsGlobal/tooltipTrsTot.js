function CustomTooltipTrsTot ({active, label, payload}) {
    if (active) {
        if (payload[2] === undefined) {
            return (
                <div className="tooltip">
                    <p className="tooltipElement bold" >{label}</p>
                    <p className="tooltipElement">{`TRS : ${(payload[0].value).toFixed(1)}%`}</p>
                </div>
            )
        } else {
            return (
                <div className="tooltip">
                    <p className="tooltipElement bold" >{label}</p>
                    <p className="tooltipElement">{`TRS : ${(payload[0].value).toFixed(1)}%`}</p>
                    <p className="tooltipElement">{`Tendance : ${(payload[2].value).toFixed(1)}%`}</p>
                </div>
            )
        }
    }
    return null
}

export default CustomTooltipTrsTot