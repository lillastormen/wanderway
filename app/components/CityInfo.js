'use client'

import { useEffect, useState } from "react";
import { fetchCityInfo } from "../controllers/apiFunctions";
import { Box, Card, CardContent, Typography} from "@mui/material";

export default function CityInfo({ cityName }) {

    const [cityData, setCityData] = useState(null);
    const[error, setError] = useState(null);

    useEffect(() => {
        const getCityData = async () => {
            if (cityName) {
                try {
                    const data = await fetchCityInfo(cityName);
                    //formating raw html to text
                    let split = data.parse.text.split('<meta');
                    split = split[0].split('</table>');
                    let striped = split[1].replace(/<sup[^>]*>[^.]*<\/sup>?/gm, ''); 
                    striped = striped.replace(/<[^>]*>?/gm, '');
                    striped = striped.replace(/\(\/.*\)&#91;n. 1&#93; /gm, '');
                    striped = striped.replace(/&#\d*;/gm, '');

                    setCityData(striped)
                } catch (error) {
                    setError('Error fetching city info')
                    console.error(error)
                }
            }
    };
    
    getCityData();
    }, [cityName]);

    if (!cityData) {
        return <Typography>Loading city information...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', marginTop: 2 }}>
            <Card sx={{ maxWidth: 800, padding: 3, backgroundColor: '#ffffff', boxShadow: 1 }}>
                <CardContent>
                    {/* Render city data as HTML content */}
                    <Box
                        dangerouslySetInnerHTML={{ __html: cityData }}
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}



