

class Solution:
    def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
        cap_li = [0 for i in range(1000)]
        diff_li = cap_li.copy()

        for trip in trips:
            a, i, j = trip
            diff_li[i] += a
            if j < 1000:
                diff_li[j] -= a
            
        # determine whether this trip doesnt work
        base = diff_li[0]
        if base > capacity: return False
        for i in range(1, 1000):
            if base > capacity: return False
            base += diff_li[i]
            
        return True
        
        