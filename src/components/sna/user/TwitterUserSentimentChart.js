import React from 'react'
import HSBar from 'react-horizontal-stacked-bar-chart'

export default function TwitterUserSentimentChart({ data = '' }) {
  console.log(data)
  var objSentiment = []
  objSentiment = [
    {
      value: data.negative,
      color: 'red',
    },
    {
      value: data.positive,
      color: '#325434',
    },
    {
      value: data.neutral,
      color: '#6699CC',
    },
  ]

  return <HSBar showTextIn data={objSentiment} />
}
