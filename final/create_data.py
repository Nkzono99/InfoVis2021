from fastdtw import fastdtw
import pandas as pd
from itertools import combinations
from collections import defaultdict
import json


df = pd.read_csv('nhk_news_covid19_prefectures_daily_data.csv')
names = df['都道府県名'].unique()  # 都道府県名リスト

# Create DTW Dataset ##
def nkansen_for_dtw(name):
    result = df[df['都道府県名'] == name]['各地の感染者数_1日ごとの発表数']
    rmin, rmax = result.min(), result.max()
    result = (result - rmin) / (rmax - rmin)
    return result

dists = defaultdict(dict)
for name1, name2 in combinations(names, 2):
    dtw = fastdtw(nkansen_for_dtw(name1), nkansen_for_dtw(name2))[0]
    # dtw = abs(nkansen_for_dtw(name1).values - nkansen_for_dtw(name2).values)**2
    dtw = dtw.mean()
    print(name1, name2, dtw)
    dists[name1][name2] = dtw
    dists[name2][name1] = dtw

with open('dist.json', 'w', encoding='utf-8') as f:
    json.dump(dists, f)
#### Created DTW Dataset #####


# Create Number of Kansensha Dataset ##
nprefs = {}
for name in names:
    nprefs[name] = df[df['都道府県名'] == name]['各地の感染者数_累計'].max()

with open('nprefectors.csv', 'w', encoding='utf-8') as f:
    f.write('label,value\n')
    for name in names:
        f.write('{},{}\n'.format(name, nprefs[name]))
#### Created Number of Kansensha Dataset #####
