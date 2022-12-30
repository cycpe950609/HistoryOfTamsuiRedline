import pandas as pd

df = pd.read_csv('./station.csv')

# print(df)
for it in df:
    print(it)

for index, row in df.iterrows():
    print(
        "====================================================================="
    )
    path = '{}.md'.format(row[0])
    f = open(path, 'w')
    print(index, row[0])
    f.write("# 站名由來\n")
    f.write("\n")
    out_idx = 1
    f.write(str(row[out_idx]))
    out_idx += 1
    f.write("\n\n")
    f.write("# 設站狀況\n")
    f.write("\n")
    f.write(str(row[out_idx]))
    out_idx += 1
    f.write("\n\n")
    f.write("# 設站/廢站背景\n")
    f.write("\n")
    f.write(str(row[out_idx]))
    out_idx += 1
    f.write("\n\n")
    f.write("# 產業/發展/備註\n")
    f.write("\n")
    f.write(str(row[out_idx]))
    out_idx += 1
    f.write("\n\n")
    f.write("# 車站與聚落互動型態歸類\n")
    f.write("\n")
    f.write(str(row[out_idx]))
    out_idx += 1
    f.write("\n")
    print(
        "====================================================================="
    )
    f.close()
