'use strict'

//

module.exports = function(sequelize,DataType){
    var Artist= sequelize.define("Artist",{
        username:{
            type: DataType.STRING,
            allowNull:false,
            validate: {
                len:{
                    args:[5,255],
                    // msg:"Require longer username"
                }
            }
        },
        password:{
            type:DataType.TEXT,
            allowNull:false

        },
        band:{
            type: DataType.STRING,
            allowNull:false,
            validate: {
                len:{
                    args:[1,40],
                    // msg:"Not enough letters"
                }
            }
        },
        genre:{
            type:DataType.STRING,
            allowNull: false,
            validate: {
                len:{
                    args:[1,255],
                    // msg:"Not enough letters"
                },
                isAlpha:true,
            }
        },
        country:{
            type: DataType.STRING,
            allowNull:false,
            validate: {
                len:{
                    args:[1,255],
                    // msg:"NOT A COUNTRY"
                }
            }
        },
        city:{
            type: DataType.TEXT,
            allowNull:false,
            validate:{
                len:{
                    args:[1,255],
                    // msg:"Not a City"
                }
            }
        },
        email:{
            type: DataType.STRING,
            allowNull:false,
            validate:{
                isEmail:true,
            }
        },
        facebook:{
            type:DataType.TEXT,
            allowNull:false,
            validate:{
                isUrl:true,

            }
        }
    });
    return Artist;
};