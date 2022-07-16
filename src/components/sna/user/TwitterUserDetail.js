import React from 'react'
import cx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded'
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered'
import { useParams } from 'react-router-dom'
import { useQuery, useLazyQuery, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Twitter as TwitterIcon } from '@material-ui/icons'
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized'
import IconButton from '@material-ui/core/IconButton'
import TwitterUserSentimentChart from './TwitterUserSentimentChart'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(({ palette }) => ({
  card: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}))

export const GET_PROFILE_USERS = gql`
  query getUserById($user_id: BigInt) {
    users(where: { user_id: $user_id }) {
      community_id
      user_id
      screen_name
      name
      description
      profile_image_url
      followers_count
      following_count
      pagerank_score
      total_neutral_sentiment
      total_positive_sentiment
      total_negative_sentiment
    }
  }
`

export default function TwitterUserDetail({ dataUser = '' }) {
  const styles = useStyles()
  const shadowStyles = useFadedShadowStyles()
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  })

  const small = useSizedIconButtonStyles({
    color: '#000',
    padding: 8,
    childSize: 24,
  })

  var objSentiment = {
    positive: dataUser.total_positive_sentiment,
    negative: dataUser.total_negative_sentiment,
    neutral: dataUser.total_neutral_sentiment,
  }

  return (
    <Card
      className={cx(styles.card, shadowStyles.root)}
      style={{
        backgroundColor: 'rgb(244, 247, 250)',
        boxShadow: '0 8px 16px 0 #BDC9D7',
      }}
    >
      <CardContent>
        <Avatar className={styles.avatar} src={dataUser.profile_image_url} />
        <h3 className={styles.heading}>{dataUser.name}</h3>
        <span className={styles.subheader}>
          {' '}
          <IconButton
            classes={small}
            target="_blank"
            href={'https://mobile.twitter.com/' + dataUser.screen_name}
            rel="noreferrer"
          >
            <TwitterIcon style={{ color: '#4DD0E1' }} />
          </IconButton>{' '}
          @{dataUser.screen_name}
        </span>
        <br></br>
        <span className={styles.subheader}>@{dataUser.description}</span>
      </CardContent>
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <Typography
            noWrap
            style={{
              fontSize: '0.875rem',
              color: '#758392',
              mt: -0.25,
            }}
          >
            <p p className={styles.statValue}>
              > Positive {objSentiment.positive}| Negative{' '}
              {objSentiment.negative} | Neutral {objSentiment.neutral}{' '}
            </p>
          </Typography>

          <TwitterUserSentimentChart data={objSentiment} />
        </Box>
      </Box>
      <Divider light />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Followers</p>
          <p className={styles.statValue}>{dataUser.followers_count}</p>
        </Box>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Following</p>
          <p className={styles.statValue}>{dataUser.following_count}</p>
        </Box>
      </Box>
    </Card>
  )
}
