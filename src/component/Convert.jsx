import {
    useMutation,
} from '@tanstack/react-query'
import { useState } from 'react'
import useImageStore from '../store/useImageStore'

import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

const url = `http://localhost:5000/convert`

const convertBase64StringToJpgImage = async (base64String) => {
    const res = await fetch(
        `${url}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                data: {
                    base64String: base64String
                }
            })
        }
    )

    const result = await res.json()

    return result
}





const Convert = () => {
    const base64String = useImageStore((state) => state.imageUrl)

    console.log(base64String)

    const {
        data,
        error,
        isError,
        isIdle,
        isLoading,
        mutate: convertBase64
    } = useMutation({
        mutationKey: ["convertBase64"],
        mutationFn: async (base64String) => await convertBase64StringToJpgImage(base64String),
        onError: ((err) => {
            console.log("Error when convert")
            console.log(err)
        }),
        onSuccess({ data }) {
            console.log("Convert data response successfully !")
            console.log(data)
        },
    })


    return (
        <Grid
            container
            direction="row"
            alignItems="start"
            justifyContent="center"
            sx={{ height: '100vh', width: "100%", backgroundColor: "purple", border: 0 }}
        >

            <Grid item xs={12}
                sx={{ width: "100%", backgroundColor: "orange", border: 0 }}
            >
                {
                    base64String.length === 0
                        ? <Button disabled>Disabled</Button>
                        : <Button onClick={() => convertBase64(base64String.slice(23))} variant="contained">Chuyen Doi</Button>
                }
            </Grid>



            <Grid item xs={12} >
                <div style={{ width: "100%", height: "auto" }}>

                    {
                        isError ?
                            <div></div>
                            : isLoading ? <div>Loading...</div>
                                : <div>
                                    {
                                        data ?
                                            <div>{data?.text}</div>
                                            : <div>Ko co data tu server</div>
                                    }
                                </div>
                    }

                </div>
            </Grid>

        </Grid>
    )
};

export default Convert;
