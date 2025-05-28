module.exports = {
    content: ["./Public/*.{html,js}"],
    theme: {
        extend: {},
        fontFamily: {
            "Vazirmatn": "Vazirmatn",
            "Dana": "Dana",
            "DanaMedium": "Dana Medium",
            "DanaDemiBold": "Dana DemiBold",
            "MorabbaLight": "Morabba Light",
            "MorabbaMedium": "Morabba Medium",
            "MorabbaBold": "Morabba Bold",
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                lg: "1.625rem",
            },
        },
        keyframes: {
            wiggle: {
                "0%": { "box-shadow": " 0px 0px 5px blue" },
                "25%": { "box-shadow": " 0px 0px 20px blue" },
                "50%": { "box-shadow": " 0px 0px 2px blue" },
                "55%": { "box-shadow": " 0px 0px 10px orange" },
                "75%": { "box-shadow": " 0px 0px 20px orange" },
                "100%": { "box-shadow": " 0px 0px  5px orange" },
            },
        },
        animation: {
            wiggle: "wiggle 5s infinite",
        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
        },
    ],
};
