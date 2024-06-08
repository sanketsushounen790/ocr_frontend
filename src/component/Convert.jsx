import {
    useMutation,
} from '@tanstack/react-query'
import { useState } from 'react'
import useImageStore from '../store/useImageStore'

import Grid from '@mui/material/Grid';
import { Box, Button, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const url = `http://localhost:5000/convert`

const convertBase64StringToJpgImage = async (base64String, language) => {
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
                    base64String: base64String,
                    language: language
                }
            })
        }
    )

    const result = await res.json()

    return result
}





const Convert = () => {
    const base64String = useImageStore((state) => state.imageUrl)

    const language = useImageStore((state) => state.language)
    const setLanguage = useImageStore((state) => state.setLanguage)

    const handleChange = (event) => {
        //console.log(event.target.value)
        setLanguage(event.target.value);
    }

    //console.log(base64String)
    console.log(language)

    const {
        data,
        error,
        isError,
        isPending,
        mutate: convertBase64
    } = useMutation({
        mutationKey: ["convertBase64"],
        mutationFn: async (base64String, langauge) => await convertBase64StringToJpgImage(base64String, language),
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
                justifyContent="space-evenly"
                sx={{
                    width: "40%",
                    //backgroundColor: "gray",
                    border: 0
                }}
            >

                {
                    base64String.length === 0
                        ? <Button disabled variant="contained">Chuyển Đổi</Button>
                        : <Button onClick={() => convertBase64(base64String.slice(23), language)} variant="contained">Chuyển Đổi</Button>
                }

                <FormControl
                    sx={{
                        width: "200px",
                        //marginRight: "70px"
                    }}

                >
                    <InputLabel id="demo-simple-select-label" mb={1}>Language</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={language || "en"}
                        label="Language"
                        onChange={(event) => handleChange(event)}
                    >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="vie">Vietnamese</MenuItem>
                    </Select>
                </FormControl>


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
