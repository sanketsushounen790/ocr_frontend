import {
    useMutation,
} from '@tanstack/react-query'
import { useState } from 'react'
import useImageStore from '../store/useImageStore'

import Grid from '@mui/material/Grid';
import { Box, Button, Typography } from '@mui/material';

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

    const imageUrl = useImageStore((state) => state.imageUrl)
    const newImageCapture = useImageStore((state) => state.newImageCapture)

    console.log(base64String)

    const {
        data,
        error,
        isError,
        isPending,
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

    console.log(isPending)

    return (
        <Grid
            container
            direction="row"
            alignItems="start"
            justifyContent="center"
            sx={{
                height: '100vh',
                width: "100%",
                //backgroundColor: "purple",
                border: 0
            }}
        >

            <Grid
                xs={12}
                mt={3}
                container
                alignItems="center"
                justifyContent="center"
                sx={{
                    width: "50%",
                    //backgroundColor: "gray",
                    border: 0
                }}
            >
                {
                    base64String.length === 0
                        ? <Button disabled variant="contained">Chuyển Đổi</Button>
                        : <Button onClick={() => convertBase64(base64String.slice(23))} variant="contained">Chuyển Đổi</Button>
                }
            </Grid>



            <Grid
                xs={11}
                mt={3}
                container
                alignItems="start"
                justifyContent="center"
                sx={{
                    height: "100%",
                    //backgroundColor: "pink",
                    border: "solid 2px black"
                }}
            >

                {

                    isError ?
                        <Typography mt={2} variant="h5">
                            Lỗi Xin Hãy Refresh Lại Page !
                        </Typography>
                        : isPending
                            ? <Typography mt={2} variant="h5">
                                Đang Tải... ! Đợi Xíu !
                            </Typography>
                            : <>
                                {
                                    data ?
                                        data?.text.length === 0
                                            ? <Typography mt={2} variant="h5" style={{ width: '100%', maxWidth: "80%", textAlign: "center" }}>
                                                Không thể chuyển đổi từ hình ảnh văn bản sang text ! Hãy sử dụng đúng hình ảnh văn bản rõ chữ
                                            </Typography>
                                            : <Box mt={2} sx={{ width: '100%', maxWidth: "90%", textAlign: "justify" }}>{data?.text}</Box>
                                        :
                                        <Typography mt={2} variant="h5">
                                            Hãy Chụp Hình Và Bấm Chuyển Đổi !
                                        </Typography>
                                }
                            </>

                }


            </Grid>

        </Grid>
    )
};

export default Convert;
